from flask import Flask, render_template, request, jsonify, send_from_directory, g
from scapy.all import sniff
import sqlite3

app = Flask(__name__)

DATABASE = 'packets.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Function to add packet to database
def add_packet_to_database(packet):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO packets (source_ip, destination_ip, protocol, port, timestamp, length)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (packet['source_ip'], packet['destination_ip'], packet['protocol'], packet['port'], packet['timestamp'], packet['length']))
    db.commit()

# Start/Stop Capture
@app.route('/start_capture')
def start_capture():
    # TODO: Implement packet capture and store in the database
    # For now, let's add a dummy packet to the database
    dummy_packet = {
        'source_ip': '192.168.1.1',
        'destination_ip': '192.168.1.2',
        'protocol': 'TCP',
        'port': 80,
        'timestamp': '2023-01-01 12:00:00',  # Add the actual packet timestamp
        'length': 1500  # Add the actual packet length
    }
    add_packet_to_database(dummy_packet)
    return jsonify({'status': 'success'})

# Search Packets
@app.route('/search_packets', methods=['POST'])
def search_packets():
    search_term = request.form.get('ipAddress')
    # TODO: Implement searching packets based on criteria
    # For now, let's retrieve a dummy packet from the database
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM packets WHERE source_ip = ?', (search_term,))
    result = cursor.fetchone()
    packets = [{'source_ip': result[1], 'destination_ip': result[2], 'protocol': result[3], 'port': result[4], 'timestamp': result[5], 'length': result[6]}] if result else []
    return jsonify({'packets': packets})

# Get Statistics
@app.route('/get_statistics')
def get_statistics():
    # TODO: Implement retrieving statistics from the database
    return jsonify({'packets': 0})

# Render the index.html page
@app.route('/')
def index():
    # Retrieve all packets from the database
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM packets')
    packets = cursor.fetchall()

    # Pass the packets to the template
    return render_template('index.html', packets=packets)

# Serve static files (JS, CSS, etc.) directly through Flask
@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)
