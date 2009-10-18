
   def dir_is_empty?(path)
      Dir.entries(path) == [".", ".."]
   end


require 'find'

def list( file_name )

  Find.find( file_name ) do |path|
    if FileTest.directory?( path )
      puts path
      begin
        Dir::delete( path )
        puts "deleted " + path
      rescue
        puts "couldn't delete " + path
      end
     end
  end
end 

list("z:\music")
