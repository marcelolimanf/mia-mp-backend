const fs = require('fs')
const excelToJson = require('convert-excel-to-json');
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
moment.locale('pt')

const mongoose = require('../database')
const Data = require('../schema/data')


module.exports = {
  async insert(request, response) {

    if(!request.file)
    return response.status(400).json({ ok: false, message: 'Selecione o arquivo para enviar.' })
    
    if(request.file.mimetype != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    return response.status(404).json({ ok: false, message: 'Só é aceito arquivos .xlsx' })

    const result = excelToJson({
      sourceFile: `src/uploads/${request.file.originalname}`
    });

    var parseData = []

    for (let i = 1; i < result.Sheet0.length; i++) {
      const element = result.Sheet0[i];


      parseData.push({
        date: element.A, 
        type:  element.B, 
        number:  element.C, 
        operation:  element.D,
        value:  element.E,
        total:  element.F,
      })
      
    }

    await Data.insertMany(parseData).then(async () => {
      response.status(200).json({ ok: true })
    }).catch(err => {
      console.log(err)
      response.status(400).json({ ok: false })
    })

  },
  async list(request, response) {
    const { page, quantity } = request.query

    if(!Number(page) || !page || !quantity)
    return response.status(400).json({ ok: false, message: 'Incorrect request!' })

    const options = {
      page: page,
      limit: quantity,
      collation: {
        locale: 'en',
      },
    };
    
      Data.paginate({}, options, function (err, result) {
      return response.status(200).json({ ok: true, data: result })
    });
  },

  async listByDate(request, response) {
    const { startDate, finalDate } = request.query

    Data.find({ 'date': {"$gte": startDate+'T00:00:00Z', "$lt": finalDate+'T23:59:59Z'}} , function (err, result) {
      if(result){
        return response.status(200).json({ ok: true, result })
      }else{
        return response.status(400).json({ ok: false, notFound: true })
      }
    })

  },

  async deleteAllData(request, response) {
    Data.deleteMany({}, (err, result) => {
      if(err) {
        return response.status(400).json({ ok: false })
      }else{
        return response.status(200).json({ ok: true })
      }
    })
  }
}