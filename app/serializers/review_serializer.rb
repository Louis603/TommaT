class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :score, :comment, :buyer_id, :seller, :buyer

  def buyer
    if(self.object.buyer === nil)
      nil
    else
      self.object.buyer.username
    end
    
  end
  
  def seller
    self.object.user.username
  end
end
