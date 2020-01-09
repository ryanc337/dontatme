class CreateEmails < ActiveRecord::Migration[6.0]
  def change
    create_table :emails do |t|
      t.text :body
      t.string :from
      t.string :subject
      t.datetime :sent_at
      t.boolean :has_attachments
      t.string :storage_url
      t.references :address, null: false, foreign_key: true

      t.timestamps
    end
  end
end
