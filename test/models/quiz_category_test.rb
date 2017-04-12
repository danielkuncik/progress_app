require 'test_helper'

class QuizCategoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
    @category = QuizCategory.new(name: "Example Category")
  end

  test "name should be present (nonblank)" do
    @category.name = " " * 6
    assert_not @category.valid?
  end

  test "name should not be too long or too short"  do
    @category.name = "a" * 50
    assert_not @category.valid?
    @category.name = "a" * 3
    assert_not @category.valid?
  end

end
