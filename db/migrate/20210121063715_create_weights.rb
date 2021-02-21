class CreateWeights < ActiveRecord::Migration[6.0]
  def change
    create_table :weights, if_not_exists: true do |t|
      t.float :value
      t.belongs_to :cat, foreign_key: true

      t.timestamps
    end
  end
end
