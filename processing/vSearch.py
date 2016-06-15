#!/usr/bin/python

import sys
import os
from visearch import client

api = None
framemap = {}
productmap = {}

def search_get_result(image_path, limit, param):
	response = api.uploadsearch(image_path=image_path, limit=limit, **param)
	#print response
	if 'result' in response and len(response['result']) > 0:
		return response['result'][0]['im_name']
	else:
		return 'NULL'

def frame_mapping():
	global framemap	
	frameMappingFile = '../ffmpeg/combined.txt'
	f = open(frameMappingFile, 'r')
	for line in f:
		ary = line.strip().split('\t')
		framemap[ary[1]] = ary[0]
	f.close()

def product_mapping():
	global productmap
	productMappingFile = 'visenze/visenze_mapping.csv'
	with open(productMappingFile) as f:
                next(f)
                for line in f:
			ary = line.strip().split(',')
			productmap[ary[0]] = line.strip()

def process_images(ffmpeg_dir):
	frame_mapping()
	product_mapping()

	csvfilewrite = open('mapping.csv', 'w')
	csvfilewrite.write('timestamp,frame,product_name,url_rakuten,image_location\n')
	
	for file in os.listdir(ffmpeg_dir):
		imageID = file.split('.')[0]
		timestamp = framemap.get(file)
		if file.endswith(".png"):
			image_path = '../ffmpeg/'+file
			limit = 1 
			param = {'detection': 'all'}
			searchResult = search_get_result(image_path, limit, param)
			if searchResult != 'NULL':
				productInfo = productmap.get(searchResult)
				ary = productInfo.split(',')
				frame = str(file)
				product_name = str(searchResult)
				url_rakuten = str(ary[2])
				image_location = str(ary[1])
				csvfilewrite.write(str(timestamp)+','+frame+','+product_name+','+url_rakuten+','+image_location+'\n');
				print(str(timestamp)+','+frame+','+product_name+','+url_rakuten+','+image_location+'\n');

	csvfilewrite.close()

def main():
	global api
	access_key = sys.argv[1] 
	secret_key = sys.argv[2] 
	api = client.ViSearchAPI(access_key, secret_key)

	process_images('../ffmpeg')

if __name__ == "__main__":
	main()
