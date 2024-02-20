const Admin = require('../models/adminSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminRegister = async (req, res) =>{
    const {username, email, password} = req.body;

    if(!(username && email && password)){
        return res.status(400).json({error: 'All fields are required'})
    }
    try {
        const adminExit = await Admin.findOne({email: email});
        if(adminExit) return res.status(400).json({message: 'Admin already exists'});

        const hashPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
            username,
            email,
            password: hashPassword,
        });
        res.status(201).json({success: "Admin created successfuly", admin});
    } catch (error) {
        res.status(500).json({error});
    }
};

const adminLogin = async (req, res) =>{
    const {email, password} = req.body;
    if (!(email && password)) {
        return res.status(400).json({ error: "All fields are required" })
    }

    try {
        const admin = await Admin.findOne({email: email});
        if(!admin){
            return res.status(401).json({message: 'Admin does not exist'});
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(isMatch){
            const payload = {
                id: admin._id,
                email: admin.email
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 24*60*60});
            return res.status(200).json({success: "Successfully logged in", admin: admin, token: `Bearer ${token}`});
        }

    } catch (error) {
        res.status(401).json({message: "Invalid credentials"});
    }
}

const getAdminDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ message: 'No admin found' });
        }

        res.status(200).json({ success: 'Admin found', admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email} = req.body;

        if (!(username || email )) {
            return res.status(400).json({ error: 'At least one field is required for update' });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        if (username) {
            admin.username = username;
        }
        if (email) {
            admin.email = email;
        }

        const updatedAdmin = await admin.save();
        res.status(200).json({ success: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        await admin.remove();
        res.status(200).json({ success: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { adminRegister, adminLogin, getAdminDetail, deleteAdmin, updateAdmin };