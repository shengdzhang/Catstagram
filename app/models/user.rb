# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  profile_pic_url :string
#  biography       :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :posts, dependent: :destroy

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

  def self.find_by_query(query)
    return [] if query.empty?
    User.where(["username LIKE ?", "%#{query.downcase}%"]).limit(10)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = generate_session_token
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

  def user_feed
    following_ids = Relationship.select(:following_id).where(follower_id: self.id).map(&:following_id)
    following_ids << self.id
    Post.includes(:user).where(:user_id => following_ids).order(created_at: :desc)
  end

  private

  def init
    self.username.downcase!
    self.profile_pic_url ||= "http://s3-us-west-1.amazonaws.com/witty-avatars/default-avatar-4-l.jpg"
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end
end
