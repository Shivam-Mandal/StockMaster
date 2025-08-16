import Admin from '../model/adminModel.js';
import bcrypt from 'bcryptjs';
import Store from '../model/storeModel.js';
import Session from '../model/sessionModel.js';
import LogActivity from '../model/logActivityModel.js';

const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password'); 
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        res.status(200).json({ admin });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}


const addOperator = async (req, res) => {
    try {
        const adminId = req.admin.id;
        const admin = await Admin.findById(adminId).select('-password'); 

        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingOperator = await Admin.find({ email });
        if (existingOperator.length > 0) {
            return res.status(400).json({ message: 'Operator with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newOperator = new Admin({
            name,
            email,
            password: hashedPassword, 
            role: 'operator',
            createdBy: req.admin.id, 
            storeId: admin.storeId,
        });

        await newOperator.save();

        //need to remove password from response
        newOperator.password = undefined;

        res.status(201).json({ message: 'Operator added successfully', operator: newOperator });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

const getAllOperators = async (req, res) => {
  try {
    const adminId = req.admin.id;

    // Find all operators created by this admin
    const operators = await Admin.find({
      role: "operator",
      createdBy: adminId,
    }).select("-password");

    const operatorList = await Promise.all(
      operators.map(async (operator) => {
        const isOnline = await Session.exists({
          adminId: operator._id,
          status: "active",
        });

        return {
          operatorId: operator._id,
          name: operator.name,
          email: operator.email,
          role: operator.role,
          createdAt: operator.createdAt,
          isOnline: !!isOnline,
        };
      })
    );

    res.status(200).json({ operators: operatorList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


const updateSession = async (req, res) => {
    try {
        const adminId = req.admin.id;
        const session = await Session.findOne({ adminId, status: 'active' });
        if (!session) {
            LogActivity.create({
                adminId,
                type: 'error',
                message: 'No active session found for loggedin User',
            });
            return res.status(404).json({ message: 'No active session found' });
        }

        session.logoutTime = new Date();
        await session.save();
    } catch (err) {
        console.error(err);
        LogActivity.create({
            adminId: req.admin.id,
            type: 'error',
            message: 'Error updating session',
        });
        res.status(500).json({ error: 'Server error' });
    }
}
const getInactiveStores = async (req, res) => {
    try {       
        const inactiveStores = await Store.find({ isActive: false }).populate('adminId', 'name email');
        if (!inactiveStores || inactiveStores.length === 0) {
            return res.status(404).json({ message: 'No inactive stores found' });
        }

        res.status(200).json({ inactiveStores });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

const getOperatorInfo = async (req, res) => {
    try {
        const { operatorId } = req.body;
        if (!operatorId) {
            return res.status(400).json({ message: 'Operator ID is required' });
        }

        const operator = await Admin.findById(operatorId).select('-password');
        if (!operator || operator.role !== 'operator') {
            return res.status(404).json({ message: 'Operator not found' });
        }

        const lastSession = await Session.findOne({ adminId: operator._id }).sort({ loginTime: -1 });
        const isOnline = lastSession? lastSession.status === 'active' : false;
        const lastActivity = lastSession ? lastSession.logoutTime : null;

        const response = {
            name: operator.name,
            email: operator.email,
            role: operator.role,
            createdAt: operator.createdAt,
            storeId: operator.storeId,
            todayLoginCount: operator.todayLoginCount,
            lastLogin: operator.lastLogin,
            todayLoginDuration: operator.todayLoginDuration,
            totalLoginDuration: operator.totalLoginDuration,
            lastPasswordChange: operator.lastPasswordChange,
            isOnline: isOnline,
            lastActivity: lastActivity,
        };
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}


export default {
    getAdminProfile, 
    addOperator,
    getInactiveStores,
    updateSession,
    getAllOperators,
    getOperatorInfo
};
