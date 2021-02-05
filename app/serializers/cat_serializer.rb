class CatSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :birthdate, :breed, :user_id, :image
  belongs_to :user

    def image
      if object.image.attached?
        {
          url: rails_blob_url(object.image)
        }
      end
  end
end