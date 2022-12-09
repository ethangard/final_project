tags = ["school","work","leisure","sleep", "eat", "pet dogs"]

def create(arr)
 # p arr
  new_arr = []
  rand(2..4).times do
    new_arr.push(arr.sample)
  end
  p new_arr
end

create(tags)
