import os
import pandas as pd
import pymongo
import json

def import_CSV(filePath):
    mng_client = pymongo.MongoClient('mongodb+srv://david:pass1234@auth.s8xiojc.mongodb.net/?retryWrites=true&w=majority', 27017)
    mng_db = mng_client['test'] 
    collection_name = 'customers' 
    db_cm = mng_db[collection_name]
    cdir = os.path.dirname(__file__)
    file_res = os.path.join(cdir, filePath)

    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))

    db_cm.insert_many(data_json)
    print(data.head())
  
if __name__ == "__main__":
    filepath = r'D:\customers\customers_customers-1000.csv' 
    import_CSV(filepath)
