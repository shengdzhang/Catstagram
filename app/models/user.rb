# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  displayname     :string
#  password_digest :string           not null
#  session_token   :string           not null
#  profile_pic_url :string
#  description     :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  default_scope { order('username ASC') }

  has_many :media, dependent: :destroy

  has_many :likes, dependent: :destroy
  has_many :liked_media, through: :likes, source: :medium

  has_many :comments, dependent: :destroy

  has_many :active_relationships,
    class_name: "Relationship",
    foreign_key: :follower_id,
    primary_key: :id,
    dependent: :destroy

  has_many :passive_relationships,
    class_name: "Relationship",
    foreign_key: :following_id,
    primary_key: :id,
    dependent: :destroy

  has_many :followees, through: :active_relationships

  has_many :followers, through: :passive_relationships

  attr_reader :password

  after_initialize :ensure_session_token
  before_save :init

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username.downcase)
    return nil if user.nil?
    user if user.is_password?(password)
  end

  def self.guest
    user = User.find_by_username("guest")
    user = User.create({username: "guest", displayname: "Guest", password: SecureRandom.urlsafe_base64(16).to_s, profile_pic_url: "http://res.cloudinary.com/catstagram/image/upload/v1445632575/Anonymous_denjpa.png"}) unless user
    return user
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def follow!(user)
    return if user == self
    self.active_relationships.create!(following_id: user.id)
  end

  def unfollow!(user)
    self.active_relationships.find_by_following_id(user.id).destroy!
  end

  def following?(user)
    self.followees.include?(user)
  end

  private

  def init
    self.username.downcase!
    self.profile_pic_url ||= "http://res.cloudinary.com/catstagram/image/upload/v1445632575/Anonymous_denjpa.png"
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
