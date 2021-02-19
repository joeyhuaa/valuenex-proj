require 'byebug'

class MainController < ApplicationController
  skip_before_action :verify_authenticity_token

  def home
  end

  def new_data
    # byebug
    puts params['file']

    # do i need a model in order to save data to db?
    # manipulate data cols here according to included_cols and assigned_cols
  end
end
