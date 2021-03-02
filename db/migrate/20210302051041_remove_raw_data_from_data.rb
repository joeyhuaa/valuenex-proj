class RemoveRawDataFromData < ActiveRecord::Migration[6.1]
  def change
    remove_column :data, :raw_data, :string
  end
end
