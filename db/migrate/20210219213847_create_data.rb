class CreateData < ActiveRecord::Migration[6.1]
  def change
    create_table :data do |t|
      t.timestamps
      t.string :included_data
      t.string :assigned_data
    end
  end
end
