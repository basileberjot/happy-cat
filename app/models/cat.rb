class Cat < ApplicationRecord
    has_one_attached :image
    belongs_to :user
    has_many :weights, dependent: :destroy 
end
