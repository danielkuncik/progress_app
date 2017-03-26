class User < ApplicationRecord
  has_many :grades



  has_secure_password

end
