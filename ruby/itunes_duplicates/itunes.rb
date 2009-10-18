require 'find'

def list( file_name )
#  i = 0
  Find.find( file_name ) do |path|
    if not FileTest.directory?( path )
      puts path
      external = path.gsub( "d:", "z:" )
      puts external
      if File::exists?(external)
        puts "file exist"
	
        new_path = external.gsub( "z:", "z:duplicate/" ) 
	puts "Moving to " + new_path
	
	dirs = new_path.split("/")
	new_dir = dirs[0]        
	dirs = dirs[1...dirs.size - 1]
        dirs.each do |dir|
                puts dir
        	new_dir += "/" + dir
		Dir.mkdir(new_dir, mode=0777 ) if not File::exists?( new_dir )
        end
        
        File.rename( external, new_path )
        begin
	  del_dir = external[0...external.rindex("/")]
          #puts " del dir " + del_dir          
          Dir::delete( del_dir )
          puts "deleted " + del_dir
        rescue
         #puts "failed to delete dir " + new_dir
        end
      end
      #break if i >= 15
     # i += 1
    end
  end
end 

list("d:\music")
