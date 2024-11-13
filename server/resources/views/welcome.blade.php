<!-- resources/views/upload-image.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Images</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2 class="text-center">Upload Images to Firebase</h2>
        @if(session('urls'))
            <div class="alert alert-success">
                <p>Images uploaded successfully! View at:</p>
                @foreach(session('urls') as $url)
                    <a href="{{ $url }}" target="_blank">{{ $url }}</a><br>
                @endforeach
            </div>
        @endif

        <form action="{{ route('upload.image') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="images">Choose Images:</label>
                <input type="file" name="images[]" class="form-control" id="images" multiple required>
                @error('images.*')
                    <small class="text-danger">{{ $message }}</small>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">Upload</button>
        </form>
    </div>
</body>
</html>
