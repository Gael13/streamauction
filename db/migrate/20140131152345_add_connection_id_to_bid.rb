class AddConnectionIdToBid < ActiveRecord::Migration
  def change
    add_column :bids, :connection_id, :integer
  end
end
