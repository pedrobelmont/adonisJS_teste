import BaseSchema from '@ioc:Adonis/Lucid/Schema'

// aque em se vamos mandar a query para sgbd para ser construido a nossa tebla 
export default class extends BaseSchema {
  protected tableName = 'moments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('image')
      table.string('description')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
