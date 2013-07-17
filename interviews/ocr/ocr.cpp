#include "libs/lodepng.h"
#include <iostream>
#include <curl/curl.h>

// Struct to keep track of longest vertical white line
struct vertical_line_t {
	unsigned x;
	unsigned y_start;
	unsigned length;
};

/* Struct for each pixel
   LodePNG parses a PNG file and returns 4 bytes for each pixel.
   Since the exercise image is greyscale it only uses the 1st 8 bytes or the 
   r field for the whole color.
   This is a small waste of memory but also allow the program to support images
   with more colors.
 */
struct rgba_t {
	unsigned char r;
	unsigned char g;
	unsigned char b;
	unsigned char a;
};

/*  Check if a pixel is white when only the 1st 8bits are used
    This can be modified if needed to check all 4 bytes for a 32-bit pixel,
    but that is outside the scope of this exercise.
 */
inline bool is_white_8bit(rgba_t* pixel) { return pixel->r == 0xff;}

// For debugging
inline void print_vertical_line(vertical_line_t v) {
	std::cout << "Vertical Line (x, y, length) " << v.x << ", " << v.y_start << ", " << v.length << std::endl;
}

struct MemoryStruct {
	char *memory;
	size_t size;
};

//Takes a PNG file in a MemoryStruct buffer and processes it to display as ASCII
void interrogate_png(struct MemoryStruct chunk, bool debug = false) {
	std::vector<unsigned char> image; //the raw pixels
	unsigned width, height;
	lodepng::State state; //optionally customize this one
	unsigned error = lodepng::decode(image, width, height, state, 
		reinterpret_cast<const unsigned char*>(chunk.memory), chunk.size);

	//if there's an error, display it
	if(error) {
		std::cout << "PNG decoder error " << error << ": " << lodepng_error_text(error) << std::endl;
		return;
	}
	
	//the pixels are now in the vector "image", 4 bytes per pixel, ordered RGBARGBA..., use it as texture, draw it, ...
	// It's returned as a vector<unsigned char> where each pixel is 4 bytes, but we will cast to a struct to make
	// sense out of it.
	
	// Some debugging info about the PNG file
	if (debug) {
		std::cout << "successfully loaded png " << width << "x" << height << " pixels, vector size " << image.size() << std::endl;
		LodePNGInfo& info = state.info_png;
		LodePNGColorMode& color = state.info_png.color;

		std::cout << "Width: " << width << std::endl;
		std::cout << "Height: " << height << std::endl;
		std::cout << "Num pixels: " << width * height << std::endl;
		std::cout << "Compression method: " << info.compression_method << std::endl;
		std::cout << "Filter method: " << info.filter_method << std::endl;
		std::cout << "Interlace method: " << info.interlace_method << std::endl;
		std::cout << "Color type: " << color.colortype << std::endl;
		std::cout << "Bit depth: " << color.bitdepth << std::endl;
		std::cout << "Bits per pixel: " << lodepng_get_bpp(&color) << std::endl;
		std::cout << "Channels per pixel: " << lodepng_get_channels(&color) << std::endl;
		std::cout << "Is greyscale type: " << lodepng_is_greyscale_type(&color) << std::endl;
		std::cout << "Can have alpha: " << lodepng_can_have_alpha(&color) << std::endl;
		std::cout << "Palette size: " << color.palettesize << std::endl;
		std::cout << "Has color key: " << color.key_defined << std::endl;
		std::cout << "Has color r: " << color.key_r << std::endl;
		std::cout << "Has color g: " << color.key_g << std::endl;
		std::cout << "Has color b: " << color.key_b << std::endl;
	}
	
	// First we need to find the longest vertical white line
	vertical_line_t max, current;	
	for (size_t x = 0; x < width; x++) {
		for (size_t y = 0; y < height; y++) {

			size_t index = (y * width + x) * 4;
			rgba_t* pixel = reinterpret_cast<rgba_t*> (&image[index]);

			if(is_white_8bit(pixel)) {
				if(current.length == 0) { // new vertical line ie. 1st white pixel
					current.x = x;
					current.y_start = y;
					current.length = 1;
				} else { // white pixel continuation of vertical line
					current.length++;
				}
			} else { // found a black pixel so reset counter
				current.length = 0;
			}
			
			if (current.length > max.length)
				max = current;
		}
		current.length = 0; //reset counter at bottom of image
	}
	
	if (debug) {
		std::cout << "Max ";
		print_vertical_line(max);
	}
	
	// Now print out all the pixels
	for (size_t y = 0; y < height; y++) {
		for (size_t x = 0; x < width; x++) {

			size_t index = (y * width + x) * 4;
			rgba_t* pixel = reinterpret_cast<rgba_t*> (&image[index]);
			
			if(is_white_8bit(pixel)) {
				if (x == max.x && y >= max.y_start && y < (max.y_start + max.length))
					std::cout << "V";
				else
					std::cout << "X";
			} else {
				std::cout << " ";
			}
		}
		std::cout << std::endl;
	}
}

// CURL function to take data received from HTTP request and store in memory
static size_t
WriteMemoryCallback(void *contents, size_t size, size_t nmemb, void *userp)
{
	size_t realsize = size * nmemb;
	struct MemoryStruct *mem = (struct MemoryStruct *)userp;

	mem->memory = (char*)realloc(mem->memory, mem->size + realsize + 1);
	if(mem->memory == NULL) {
		/* out of memory! */
		printf("not enough memory (realloc returned NULL)\n");
		return 0;
	}

	memcpy(&(mem->memory[mem->size]), contents, realsize);
	mem->size += realsize;
	mem->memory[mem->size] = 0;

	return realsize;
}

int main(int argc, char *argv[])
{
	const char* url = argc > 1 ? argv[1] : "http://174.129.202.172:8880/exercise.png";
	
	CURL *curl_handle;
	CURLcode res;

	struct MemoryStruct chunk;

	chunk.memory = (char*)malloc(1);  /* will be grown as needed by the realloc above */
	chunk.size = 0;    /* no data at this point */

	curl_global_init(CURL_GLOBAL_ALL);

	/* init the curl session */
	curl_handle = curl_easy_init();

	/* specify URL to get */
	curl_easy_setopt(curl_handle, CURLOPT_URL, url);

	/* send all data to this function  */
	curl_easy_setopt(curl_handle, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);

	/* we pass our 'chunk' struct to the callback function */
	curl_easy_setopt(curl_handle, CURLOPT_WRITEDATA, (void *)&chunk);

	/* some servers don't like requests that are made without a user-agent
	   field, so we provide one */
	curl_easy_setopt(curl_handle, CURLOPT_USERAGENT, "libcurl-agent/1.0");

	/* get it! */
	res = curl_easy_perform(curl_handle);

	/* check for errors */
	if(res != CURLE_OK) {
		fprintf(stderr, "curl_easy_perform() failed: %s\n",
			curl_easy_strerror(res));
	} else {

		//printf("%lu bytes retrieved\n", (long)chunk.size);

		interrogate_png(chunk, false);
	}

	/* cleanup curl stuff */
	curl_easy_cleanup(curl_handle);

	if(chunk.memory)
		free(chunk.memory);

	/* we're done with libcurl, so clean it up */
	curl_global_cleanup();

	return 0;
}
