class AddVisitDetailsVolumnToReports < ActiveRecord::Migration[7.0]
  def change
    add_column :reports, :visit_details, :text
  end
end
