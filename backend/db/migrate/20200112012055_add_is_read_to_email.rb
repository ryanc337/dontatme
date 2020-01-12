class AddIsReadToEmail < ActiveRecord::Migration[6.0]
  def change
    add_column :emails, :is_read, :boolean, default: false
  end
end