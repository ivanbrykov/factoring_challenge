class Invoice < ApplicationRecord
  has_one_attached :scan
  validates_inclusion_of :status, in: %w[created rejected approved purchased closed]
  attribute :status, default: 'created'
  validates_numericality_of :amount

  # @todo we probably would benefit from some kind of a state machine here but it'll do for now
  def available_actions
    {
      created: %w[approve reject],
      rejected: [],
      approved: %w[purchase],
      purchased: %w[close]
    }[status.to_sym]
  end
end
