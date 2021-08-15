require 'byebug'

class MainController < ApplicationController
  skip_before_action :verify_authenticity_token

  def home
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
    render :json => {status: 200}
  end

  def delete_data
    Data.find(params[:id]).destroy
    render :json => {status: 200}
  end
end
