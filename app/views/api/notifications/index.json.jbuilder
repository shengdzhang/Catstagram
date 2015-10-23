json.array! @notifications do |notification|
  json.extract! notification, :id, :message, :href, :checked, :created_at
end
