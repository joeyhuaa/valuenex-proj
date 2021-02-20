require 'byebug'
require 'csv'

class MainController < ApplicationController
  skip_before_action :verify_authenticity_token

  def home
  end

  def new_data
    @data = Data.new
    @data.included_data = [] # arr of objs
    @data.assigned_data = [] # arr of objs
    file = params['file']
    included_cols = params['included_cols'].split(',')
    assigned_cols = JSON.parse(params['assigned_cols'])

    # manipulate data cols here according to included_cols and assigned_cols
    if file.content_type == 'text/csv'
      CSV.foreach(file, headers: true) do |row|
        @data.included_data.push(
          Hash[ included_cols.map { |col| [col, *row.values_at(col)] } ]
        )

        @data.assigned_data.push(
          Hash[ assigned_cols.to_a.map { |col| [col[0], *row.values_at(col[1])] } ]
        )
      end
    elsif file.content_type == 'text/tab-separated-values'
      CSV.foreach(file, headers: true, col_sep: "\t", quote_char: nil) do |row|
        @data.included_data.push(
          Hash[ included_cols.map { |col| [col, *row.values_at(col)] } ]
        )

        @data.assigned_data.push(
          Hash[ assigned_cols.to_a.map { |col| [col[0], *row.values_at(col[1])] } ]
        )
      end
    end

    # save to db
    @data.file = file
    @data.save
  end
end
