const demoService = require("../services/demoScheduleService");

const scheduleDemo = async (req, res, next) => {
    try {
        const demoData = {
            Request_Id: req.body.Request_Id,
            Scheduled_DateTime: req.body.Scheduled_DateTime,
        };

        const demo = await demoService.scheduleDemo(demoData);
        return res.status(201).json(demo);
    } catch (error) {
        next(error);
    }
};

const getDemoById = async (req, res, next) => {
    try {
        const { demoId } = req.params;
        const demos = await demoService.getDemoById(demoId);
        return res.status(200).json(demos);
    } catch (error) {
        next(error);
    }
};

const deleteDemoById = async (req, res, next) => {
    try {
        const { demoId } = req.params;
        await demoService.deleteDemoById(demoId);
        return res.status(200).json({ message: "Demo deleted successfully" });

    } catch (error) {
        next(error);
    }
}

const getAllDemos = async (req, res, next) => {
    try {
        const demos = await demoService.getAllDemos();
        return res.status(200).json(demos);
    } catch (error) {
        next(error);
    }
};

const approveDemoById = async (req, res, next) => {
    try {
        const { demoId } = req.params;
        const demo = await demoService.approveDemoById(demoId, req.body);
        return res.status(200).json(demo);
    } catch (error) {
        next(error);
    }
}


module.exports = { scheduleDemo, getDemoById, getAllDemos, deleteDemoById, approveDemoById };
