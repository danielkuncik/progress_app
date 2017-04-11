require 'test_helper'

class QuizCategoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get quiz_categories_show_url
    assert_response :success
  end

end
