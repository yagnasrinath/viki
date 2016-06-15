import csv
import json

csvfile = open('mapping.csv', 'r')
jsonfile = open('mapping.json', 'w')

fieldnames = ("timestamp","product_name","url_rakuten","image_location")
reader = csv.DictReader(csvfile, fieldnames)
jsonfile.write('{\n')
i=0
for row in reader:
	if i == 0:
		i += 1
		continue	
	if i != 1:
		jsonfile.write(',')
	key = row.get('timestamp')
	jsonfile.write('\"'+key+'\":')
	json.dump(row, jsonfile)
	jsonfile.write('\n')
	i += 1
jsonfile.write('}')
