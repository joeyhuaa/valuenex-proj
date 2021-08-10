require 'byebug'

class MainController < ApplicationController
  skip_before_action :verify_authenticity_token

  def home
    @all_data = Data.all
  end

  def uploads
    render :json => {:uploads => Data.all}
  end

  def new_data
    @data = Data.new
    @data.included_data = JSON.parse( params['included_data'] )
    @data.assigned_data = JSON.parse( params['assigned_data'] )
    @data.filename = params['filename']
    @data.save
  end
end
