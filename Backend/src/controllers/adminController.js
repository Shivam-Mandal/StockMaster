import Admin from '../model/adminModel.js';

const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password'); 
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        res.status(200).json({ admin });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

export default getAdminProfile;