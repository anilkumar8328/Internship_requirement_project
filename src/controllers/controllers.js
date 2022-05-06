const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const mongoose = require('mongoose');


let createCollege = async (req, res) => {
    try {
        let data = req.body
        let name = req.body.name.trim()
        let fullName = req.body.fullName.trim()
        let logoLink = req.body.logoLink.trim()
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "Body is required" })

        if (name.length == 0) return res.status(400).send({ status: false, message: "College Name is Required" })

        const findName = await collegeModel.find({ name: name, isDeleted: false })

        if (findName.length > 0) return res.status(401).send({ status: false, message: `${name} already exist` })

        if (fullName.length == 0) return res.status(400).send({ status: false, message: "College Full Name is Required" })

        if (logoLink.length == 0) return res.status(400).send({ status: false, message: "logo is Required" })

        const createData = await collegeModel.create(data)

        if (!createData) return res.status(500).send({ status: false, message: "Creation Failed" })
        res.status(201).send({ status: true, data: createData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}


let createIntern = async (req, res) => {
    try {
        let data = req.body
        let number = req.body.mobile.trim()
        let email = req.body.email.trim()
        let name = req.body.name.trim()
        let collegeId = req.body.collegeId.trim()
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "Body is required" })

        if (name.length == 0) return res.status(400).send({ status: false, message: "Name is Required" })

        if (email.length == 0) return res.status(400).send({ status: false, message: "Email is Required" })
        //validation
        let validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!validateEmail.test(email)) return res.status(400).send({ status: false, messsage: `${email} is not a valid emailId` })
        //unique
        let findData = await internModel.find({ email: email, isDeleted: false })
        if (findData.length > 0) return res.status(404).send({ status: false, message: `${email} Already Exist` })

        if (number.length == 0) return res.status(400).send({ status: false, message: "Mobile number is Required" })
        //validation
        let validateMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/

        if (!validateMobile.test(number)) return res.status(400).send({ status: false, messsage: "Number must be Numeric and valid" })
        //unique
        let findNumber = await internModel.find({ mobile: number, isDeleted: false })

        if (findNumber.length > 0) return res.status(404).send({ status: false, message: `${number} Already Exist` })


        if (collegeId.length == 0) return res.status(400).send({ status: false, message: "College Id is Required" })
        if (!mongoose.isValidObjectId(collegeId)) return res.status(400).send({ status: false, message: `${collegeId} is an invalid ObjectId` })


        let create = await internModel.create(data)
        res.status(201).send({ status: true, data: create })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


let getCollege = async (req, res) => {
    try {
        let data = req.query.collegeName
        if (!data) return res.status(400).send({ status: false, message: "provide the College name" })
        let findCollege = await collegeModel.find({ name: data })
        if (findCollege.length == 0) return res.status(404).send({ status: false, message: `${data} doesn't exist` })

        let findIntern = await internModel.find({ collegeId: findCollege[0]._id }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        if (findIntern.length == 0) return res.status(404).send({ status: false, messsage: `No intern applied in ${data}` })

        res.status(200).send({ status: true, data: { name: data, fullName: findCollege[0].fullName, logoLink: findCollege[0].logoLink, interests: findIntern } })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.getCollege = getCollege