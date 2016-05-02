# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  body             :text             not null
#  user_id          :integer          not null
#  commentable_id   :integer          not null
#  commentable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :body, :user_id, :commentable_id, :commentable_type, presence: true;
  default_scope { order('created_at ASC') }

  belongs_to :commentable, polymorphic: true

  has_many :comments, as: :commentable, dependent: :destroy

  belongs_to(
   :parent_comment,
   class_name: "Comment",
   foreign_key: :commentable_id
  )

  belongs_to :medium
  belongs_to :user
end
