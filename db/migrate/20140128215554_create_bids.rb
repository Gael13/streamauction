class CreateBids < ActiveRecord::Migration
  def change
    create_table :bids do |t|
      t.string :amount

      t.timestamps
    end
  end
end
