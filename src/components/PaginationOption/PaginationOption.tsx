import React from 'react';

const PaginationOption = () => {
  return (
    <div
      style={{
        width: '20%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexShrink: 0,
      }}
    >
      {/* Ícone Esquerdo */}
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzcnIGhlaWdodD0nMzQnIHZpZXdCb3g9JzAgMCAzNyAzNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPGcgZmlsdGVyPSd1cmwoI2ZpbHRlcjBfZF8zNV8xMjI4KSc+CjxwYXRoIGQ9J000IDEzTDMyLjUgMC4wMDk2MTg3NlYyNS45OTA0TDQgMTNaJyBmaWxsPScjN0JCNTlFJy8+CjxwYXRoIGQ9J00zMiAwLjc4NzEwOVYyNS4yMTI5TDUuMjA1MDggMTNMMzIgMC43ODcxMDlaJyBzdHJva2U9J3doaXRlJy8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9J2ZpbHRlcjBfZF8zNV8xMjI4JyB4PScwJyB5PScwLjAwOTY0MzU1JyB3aWR0aD0nMzYuNScgaGVpZ2h0PSczMy45ODA3JyBmaWx0ZXJVbml0cz0ndXNlclNwYWNlT25Vc2UnIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0nc1JHQic+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9JzAnIHJlc3VsdD0nQmFja2dyb3VuZEltYWdlRml4Jy8+CjxmZUNvbG9yTWF0cml4IGluPSdTb3VyY2VBbHBoYScgdHlwZT0nbWF0cml4JyB2YWx1ZXM9JzAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwJyByZXN1bHQ9J2hhcmRBbHBoYScvPgo8ZmVPZmZzZXQgZHk9JzQnLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMicvPgo8ZmVDb21wb3NpdGUgaW4yPSdoYXJkQWxwaGEnIG9wZXJhdG9yPSdvdXQnLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0nbWF0cml4JyB2YWx1ZXM9JzAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCcvPgo8ZmVCbGVuZCBtb2RlPSdub3JtYWwnIGluMj0nQmFja2dyb3VuZEltYWdlRml4JyByZXN1bHQ9J2VmZmVjdDFfZHJvcFNoYWRvd18zNV8xMjI4Jy8+CjxmZUJsZW5kIG1vZGU9J25vcm1hbCcgaW49J1NvdXJjZUdyYXBoaWMnIGluMj0nZWZmZWN0MV9kcm9wU2hhZG93XzM1XzEyMjgnIHJlc3VsdD0nc2hhcGUnLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg=="
        alt="Polygon13512"
        style={{
          width: '30px',
          height: '38px',
          alignSelf: 'stretch',
          flexGrow: 1,
        }}
      />

      {/* Espaço Central (Ex: nome de página) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          color: '#000',
        }}
      >
        {/* Insira aqui texto ou outros elementos */}
        <span style={{ fontWeight: 'bold' }}>1</span>
      </div>

      {/* Ícone Direito */}
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzcnIGhlaWdodD0nMzQnIHZpZXdCb3g9JzAgMCAzNyAzNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPGcgZmlsdGVyPSd1cmwoI2ZpbHRlcjBfZF8zNV8xMjI5KSc+CjxwYXRoIGQ9J00zMyAxM0w0LjUgMjUuOTkwNEw0LjUgMC4wMDk2MTg3NkwzMyAxM1onIGZpbGw9JyM3QkI1OUUnLz4KPHBhdGggZD0nTTUgMjUuMjEyOUw1IDAuNzg3MTA5TDMxLjc5NDkgMTNMNSAyNS4yMTI5Wicgc3Ryb2tlPScjRURGMkZEJy8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9J2ZpbHRlcjBfZF8zNV8xMjI5JyB4PScwLjUnIHk9JzAuMDA5NjQzNTUnIHdpZHRoPSczNi41JyBoZWlnaHQ9JzMzLjk4MDcnIGZpbHRlclVuaXRzPSd1c2VyU3BhY2VPblVzZScgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSdzUkdCJz4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0nMCcgcmVzdWx0PSdCYWNrZ3JvdW5kSW1hZ2VGaXgnLz4KPGZlQ29sb3JNYXRyaXggaW49J1NvdXJjZUFscGhhJyB0eXBlPSdtYXRyaXgnIHZhbHVlcz0nMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAnIHJlc3VsdD0naGFyZEFscGhhJy8+CjxmZU9mZnNldCBkeT0nNCcvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScyJy8+CjxmZUNvbXBvc2l0ZSBpbjI9J2hhcmRBbHBoYScgb3BlcmF0b3I9J291dCcvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSdtYXRyaXgnIHZhbHVlcz0nMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwJy8+CjxmZUJsZW5kIG1vZGU9J25vcm1hbCcgaW4yPSdCYWNrZ3JvdW5kSW1hZ2VGaXgnIHJlc3VsdD0nZWZmZWN0MV9kcm9wU2hhZG93XzM1XzEyMjknLz4KPGZlQmxlbmQgbW9kZT0nbm9ybWFsJyBpbj0nU291cmNlR3JhcGhpYycgaW4yPSdlZmZlY3QxX2Ryb3BTaGFkb3dfMzVfMTIyOScgcmVzdWx0PSdzaGFwZScvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K"
        alt="Polygon23512"
        style={{
          width: '30px',
          height: '38px',
          alignSelf: 'stretch',
          flexGrow: 1,
        }}
      />
    </div>
  );
};

export default PaginationOption;
