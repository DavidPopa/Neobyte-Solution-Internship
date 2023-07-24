import os
import pandas as pd
import pymongo

def export_CSV(filePath):
    mng_client = pymongo.MongoClient('mongodb+srv://david:pass1234@auth.s8xiojc.mongodb.net/?retryWrites=true&w=majority', 27017)
    mng_db = mng_client['test'] 
    collection_name = 'customers' 
    db_cm = mng_db[collection_name]
    data = list(db_cm.find({}))
    df = pd.DataFrame(data)
    df.to_csv(filePath, index=False)
    print("Data exported to CSV successfully!")

if __name__ == "__main__":
    filepath = r'D:\customers\exported_customers.csv'
    export_CSV(filepath)
