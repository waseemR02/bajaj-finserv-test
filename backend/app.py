from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET', 'POST'])
def api_endpoint():
    if request.method == 'GET':
        return jsonify({'operation_code': '12345'})
    elif request.method == 'POST':
        try:
            data = request.get_json()
        except Exception as e:
            return jsonify({'is_success': False, 'message': str(e)}), 400
        
        input_data = data.get('data', [])
        numbers = [item for item in input_data if item.isdigit()]
        alphabets = [item for item in input_data if item.isalpha()]
        highest_alphabet = max(alphabets, key=lambda x: x.upper()) if alphabets else None
        return jsonify({
            'is_success': True,
            'user_id': 'john_doe_17091999',
            'email': 'wr8389@srmist.edu.in',
            'roll_number': 'RA2111030010276',
            'numbers': numbers,
            'alphabets': alphabets,
            'highest_alphabet': [highest_alphabet] if highest_alphabet else []
        })

if __name__ == '__main__':
    app.run()