class CreateCats < ActiveRecord::Migration[6.0]
  def change
    create_table :cats do |t|
      t.string :name
      t.date :birthdate
      t.string :breed
      t.belongs_to :user, foreign_key: true

      t.timestamps

    end
  end
end
