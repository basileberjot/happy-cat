class CreateCats < ActiveRecord::Migration[6.0]
  def change
    create_table :cats do |t|
      t.string :name
      t.date :birthdate
      t.string :breed
      t.float :weight

      t.timestamps
    end
  end
end
