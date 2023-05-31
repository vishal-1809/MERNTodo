const List = require('../models/ListSchema');

module.exports.addTask = async (req, res, next) => {
    try {
        const { username, title, desc, checked } = req.body;
        const data = await List.create({
            username,
            title,
            desc,
            checked,
        });
        if (data) return res.json({ msg: "Added successfully.", status: true });
        else return res.json({ msg: "Failed to add to the database", status: false });
    }
    catch (err) {
        next(err);
    }
}

module.exports.getTask = async (req, res, next) => {
    try {
        const { username } = req.body;
        const list = await List.find({ username }).sort({ updatedAt: 1 });
        const totalList = list.map((lst) => {
            return {
                _id: lst._id,
                title: lst.title,
                desc: lst.desc,
                checked: lst.checked,
            };
        });
        res.json(totalList);
    }
    catch (err) {
        next(err);
    }
}

module.exports.getIdTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await List.findById(id);
        if(!task){
            return res.json({ message: "No Task Found", status: false });
        }
        return res.json(task);
    }
    catch (err) {
        next(err);
    }
}

module.exports.updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { username, title, desc, checked } = req.body;
        const task = await List.findByIdAndUpdate(id, {
            username: username,
            title: title,
            desc: desc,
            checked: checked
        });
        res.json({ username, title, desc, checked });
    }
    catch (err) {
        next(err);
    }
}

module.exports.status = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { checked } = req.body;
        const task = await List.findByIdAndUpdate(id, {
            checked: checked
        });
        res.json({ checked });
    }
    catch (err) {
        next(err);
    }
}

module.exports.deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await List.findByIdAndDelete(id);
        res.json(task);
    }
    catch (err) {
        next(err);
    }
}