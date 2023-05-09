from flask import Flask, render_template, request

# Flask constructor takes the name of current module (__name__) as argument.
app = Flask(__name__)

# Flask route decorator to tell Flask what URL should trigger our function.
@app.route('/',methods = ['GET'])
def main_route():
    return render_template('index.html')

# @app.route('/getData',methods = ['POST'])
# def get_data():
#     data=request.get_json()["data"]
#     data_list=[]
#     for i in data:
#         try :
#             data_list.append(float (i))
#         except:
#             pass
        
#     return data_list

if __name__ == '__main__':
    app.run(debug=True, port=3000)