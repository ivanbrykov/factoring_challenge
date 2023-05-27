class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.decimal :amount, precision: 12, scale: 2
      t.date :due_at
      t.decimal :fees_accrued, precision: 12, scale: 2
      t.string :status

      t.timestamps
    end
  end
end
