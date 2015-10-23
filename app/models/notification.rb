# == Schema Information
#
# Table name: notifications
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  message    :string           not null
#  href       :string           not null
#  checked    :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Notification < ActiveRecord::Base
  validates :user_id, :message, :href, presence: true
  validates :checked, inclusion: { in: [true, false] }
  default_scope { order('created_at DESC') }

  before_save :init

  belongs_to :user

  private

  def init
    self.checked = false
    nil
  end
end
