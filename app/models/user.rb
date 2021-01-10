class User < ApplicationRecord
    has_secure_password

    validates_presence_of :email
    validates_uniqueness_of :email

    validates :password, 
          presence: true,
          length: { minimum: 6 }
end
