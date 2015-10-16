class Relationship < ActiveRecord::Base
  validates :follower_id, :following_id, presence: true
  validates :follower_id, uniqueness: { scope: :following_id }

  belongs_to :follower,
    class_name: "User",
    foreign_key: :follower_id

  belongs_to :followee,
    class_name: "User",
    foreign_key: :following_id
end
