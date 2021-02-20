class Data < ApplicationRecord
    has_one_attached :file
    serialize :included_data, JSON
    serialize :assigned_data, JSON
end

# creating a migration
# 1. rails g migration nameOfMigration
# 2. edit the migration file & model
# 3. run rails db:migrate
    
# rails db:rollback