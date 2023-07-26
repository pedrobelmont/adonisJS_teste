// import { Response } from '@adonisjs/core/build/standalone'
import {v4 as uuidv4} from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Moment from "App/Models/Moment"
import Application from "@ioc:Adonis/Core/Application"
export default class MomentsController {
    private validadrionOptions = {
        types: ["image"], 
        size: '2mb'
    }
    public async store({request, response }: HttpContextContract){
        const body = request.body()
        
        const image = request.file('image', this.validadrionOptions)
        
        if(image) {
            const imageName = `${uuidv4()}.${image.extname}`
            
            await image.move(Application.tmpPath('uploads'),{
                name: imageName
            })
            body.image = imageName
            console.log(body)
        }
        // quando passo o moment.create ja estou acessando a tabela 
        const moment = await Moment.create(body)
        response.status(201)
        return {
            // body: body,
            msg:'seu momento foi criado com sucesso!',
            data: moment
        }
    }
    public async index(){
        const moments = await Moment.all()
        return {data:moments}
    }
    public async show({params}: HttpContextContract){
        const moment = await Moment.findOrFail(params.id)
        return{
            message:'momento excluido',
            data: moment
        }
    }
    
    public async destroy({params}: HttpContextContract){
        const moment = await Moment.findOrFail(params.id)
        
        await moment.delete()
        
        return {
            data: moment
        }
    }
}
