class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :address, index: {unique: true}, null: false

      t.timestamps
    end
  end
end
